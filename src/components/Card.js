import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {MovableCardWrapper, CardHeader, CardRightContent, CardTitle, Detail, Footer} from 'rt/styles/Base'
import InlineInput from 'rt/widgets/InlineInput'
import Tag from './Card/Tag'
import DeleteButton from 'rt/widgets/DeleteButton'

class Card extends Component {
  onDelete = e => {
    this.props.onDelete()
    e.stopPropagation()
  }

  render() {
    const {
      showDeleteButton,
      style,
      tagStyle,
      onClick,
      onDelete,
      onChange,
      className,
      id,
      title,
      label,
      description,
      tags,
      cardDraggable,
      editable,
      t,
      author,
      assigned
    } = this.props

    const updateCard = card => {
      onChange({...card, id})
    }

    return (
      <MovableCardWrapper data-id={id} onClick={onClick} style={style} className={className}>
        <CardHeader>
          <CardTitle draggable={cardDraggable}>
            {editable ? (
              <InlineInput
                value={title}
                border
                placeholder={t('placeholder.title')}
                resize="vertical"
                onSave={value => updateCard({title: value})}
              />
            ) : (
              title
            )}
          </CardTitle>
          <CardRightContent>
            {editable ? (
              <InlineInput
                value={label}
                border
                placeholder={t('placeholder.label')}
                resize="vertical"
                onSave={value => updateCard({label: value})}
              />
            ) : (
              label
            )}
          </CardRightContent>
          <span style={{fontSize: 20}}>{this.props?.type}</span>
          {showDeleteButton && <DeleteButton onClick={this.onDelete} />}
          {assigned && <img className="userIcon" title={'Assigned: ' + assigned?.name} src={assigned?.icon} />}
        </CardHeader>
        <Detail>
          {editable ? (
            <InlineInput
              value={description}
              border
              placeholder={t('placeholder.description')}
              resize="vertical"
              onSave={value => updateCard({description: value})}
            />
          ) : (
            <div dangerouslySetInnerHTML={{__html: description}} />
          )}
        </Detail>
        <small><b>State:</b> {this.props?.subGroup}</small>
        <br />
        <small>Priority: {this.props?.priority}</small>
        <br />
        <small><b>Age:</b> {this.props?.daysOld} days old</small>
        <hr />
        <small>
          <b title="Created by">🙋‍♂️</b> {author?.name}
        </small>
        <br />
        <small>
          <b title="Create at">📆</b> {new Date(this.props?.created).toLocaleString()}
        </small>
        <br />
        <small>
          <b title={'Assigned to: ' + (assigned?.id ?? '')}>👩‍💻</b> {assigned?.name ?? 'No assigned'}
        </small>
        <br />
        <small>
          <a title="URL" href={this.props.url || ''} target="_blank">
            🌎 {this.props.url || ''}
          </a>
        </small>
        <br />
        {tags &&
          tags.length > 0 && (
            <Footer>
              {tags.map(tag => (
                <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
              ))}
            </Footer>
          )}
      </MovableCardWrapper>
    )
  }
}

Card.propTypes = {
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.object,
  tagStyle: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array
}

Card.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  style: {},
  tagStyle: {},
  title: 'no title',
  description: '',
  label: '',
  tags: [],
  className: ''
}

export default Card
